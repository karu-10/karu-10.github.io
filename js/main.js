'use strict';

{
  class Panel{
    constructor(game){
      this.game=game;
      this.el=document.createElement('li');
      this.el.classList.add('pressed');//elはプロパティ
    }

    getEl(){
      return this.el;
    }

    active(num){//パネルを決定
      this.el.classList.remove('pressed');
      if(num === 5){
        this.el.textContent=4;
        return 4;
      }else if(num === 6 || num === 7){
        this.el.textContent=2;
        return 2;
      }else{
        this.el.textContent=num;
        return 0;
      }
    }

    press(){
      this.el.classList.add('pressed');
    }
  }
  
  class Board{
    constructor(game){
      this.game=game;
      this.panels=[];
      for(let i=0; i<this.game.getLevel() ** 2; i++){
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }

    setup(){
      const board=document.getElementById('backboard');
      this.panels.forEach(panel =>{
        board.appendChild(panel.getEl());//カプセル化
      });
    }
    end(){
      for(let i=0; i<16; i++){
        this.panels[i].getEl().textContent='';
        this.panels[i].press();
      }
    }

    activate(){
      for(let i=0; i<2; i++){
        const N=Math.floor(Math.random() * 3)+5;//5~7の数値
        const num=Math.floor(Math.random() * 16);//0~15の数値
        this.game.setscore(this.panels[num].active(N));
      }
    }

    processing(n,N,a){//処理(現在のマス、1つ前のマス、掛ける数値１or２)
      this.panels[N].active(this.panels[n].getEl().textContent * a);
      this.panels[n].press();//移動前のマスをpress状態にする
      this.panels[n].getEl().textContent=''; //移動前のマスの数値を消す
      this.game.onflag();
    }

    lmove(){
      let num=0;
      for(let n=0; n<4; n++){//4行分回す 
         let currentN=0;//連続で数字を足さないため
        for(let i=num+1; i<num+4; i++){//1行分の処理
          for(let j=i; j>num; j--){
            const x=this.panels[j].getEl();
            if(x.textContent !== ''){
              if(this.panels[j-1].getEl().textContent === ''){
                this.processing(j,j-1,1);
              }else if(x.textContent === this.panels[j-1].getEl().textContent && currentN === 0){
                this.processing(j,j-1,2);
                currentN++;
              } 
            }
          }
        }
        num=num+4;
      }
    }

    rmove(){
      let num=3;
      for(let n=0; n<4; n++){//4行分回す  
        let currentN=0;
        for(let i=num-1; i>num-4; i--){//1行分の処理
          for(let j=i; j<num; j++){
            const x=this.panels[j].getEl();
            if(x.textContent !== ''){
              if(this.panels[j+1].getEl().textContent === ''){
                this.processing(j,j+1,1);
              }else if(x.textContent === this.panels[j+1].getEl().textContent && currentN === 0){
                this.processing(j,j+1,2);
                currentN++;
              } 
            }
          }
        }
        num=num+4;
      }
    }

    umove(){
      let num=0;
      for(let n=0; n<4; n++){//4行分回す  
        let currentN=0;
        for(let i=num+4; i<num+13; i=i+4){//1行分の処理
          for(let j=i; j>num; j=j-4){
            const x=this.panels[j].getEl();
            if(x.textContent !== ''){
              if(this.panels[j-4].getEl().textContent === ''){
                this.processing(j,j-4,1);
              }else if(x.textContent === this.panels[j-4].getEl().textContent && currentN === 0){
                this.processing(j,j-4,2);
                currentN++;
              } 
            }
          }
        }
        num=num+1;
      }
    }

    dmove(){
      let num=12;
      for(let n=0; n<4; n++){//4行分回す  
        let currentN=0;
        for(let i=num-4; i>num-13; i=i-4){//1行分の処理
          for(let j=i; j<num; j=j+4){//比較
            const x=this.panels[j].getEl();
            if(x.textContent !== ''){
              if(this.panels[j+4].getEl().textContent === ''){
                this.processing(j,j+4,1);
              }else if(x.textContent === this.panels[j+4].getEl().textContent && currentN === 0){
                this.processing(j,j+4,2);
                currentN++;
              } 
            }
          }
        }
        num=num+1;
      }
    }

    Add(){
      const nums=[];
      this.panels.forEach((panel,index) =>{
        if(panel.getEl().textContent === ''){
          nums.push(index);
        }
      });
      const num=Math.floor(Math.random() * nums.length);//0~長さ
      const N=Math.floor(Math.random() * 3)+5;//5~7の数値
      this.game.setscore(this.panels[nums[num]].active(N));
      this.game.offlag();
    }

  }

  
  class Game{
    constructor(level){
      this.level=level;
      this.board=new Board(this);
      
      this.flag=0;
      this.firstclick=0;
      this.Allscore=document.getElementById('score');
      this.Allscore.textContent=0;

      const btn1=document.getElementById('btn1');
      btn1.addEventListener('click',() => {
        if(this.firstclick === 0){
          this.start();
        }
        this.firstclick++;
      });

      const btn2=document.getElementById('btn2');
      btn2.addEventListener('click',() => {
        this.end();
        this.Allscore.textContent=0;
        this.flag=0;
        this.firstclick=0;
      });

     this.setup();

     const ltap=document.getElementById('ltap');
     ltap.addEventListener('click',() => {
       this.lmove();
       if(this.flag === 1){
         this.Add();
         } 
     });

     const rtap=document.getElementById('rtap');
     rtap.addEventListener('click',() => {
       this.rmove();
       if(this.flag === 1){
        this.Add();
        } 
     });

     const utap=document.getElementById('utap');
     utap.addEventListener('click',() => {
       this.umove();
       if(this.flag === 1){
        this.Add();
        } 
     });

     const dtap=document.getElementById('dtap');
     dtap.addEventListener('click',() => {
       this.dmove();
       if(this.flag === 1){
        this.Add();
        } 
     });
     
    }

    setscore(num){
      this.Allscore.textContent=parseInt(this.Allscore.textContent,10)+num;
    }

    setup(){
      const container=document.getElementById('container');
      const PANEL_WIDTH=50;
      const BOARD_PADDING=10;
      container.style.width=PANEL_WIDTH*this.level+BOARD_PADDING*2+'px';
    }

    start(){
      this.board.activate();
    }
    end(){
      this.board.end();
    }

    lmove(){
      this.board.lmove();
    }
    rmove(){
      this.board.rmove();
    }
    umove(){
      this.board.umove();
    }
    dmove(){
      this.board.dmove();
    }
    Add(){
      this.board.Add();
    }
    onflag(){
      this.flag=1;
    }
    offlag(){
      this.flag=0;
    }

    getLevel(){
      return this.level;
    }
  }
  
  new Game(4);
}