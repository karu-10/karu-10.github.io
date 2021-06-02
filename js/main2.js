'use strict';
{
  // メニューバーに関するコード
  const menuItems=document.querySelectorAll('.menu li a');
  menuItems.forEach(clickedItem => {
    clickedItem.addEventListener('click',e =>{
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
      clickedItem.classList.add('active');
    });
  });

  // ロード画面に関するコード
  window.onload = ()=>{
    const loader = document.getElementById('loader');
    loader.classList.add('loaded');
 }

 //ゲームの説明タブに関するコード  
 const desItems=document.querySelectorAll('.description li a');
 const contents=document.querySelectorAll('.content');
 desItems.forEach(clickeditem => {
   clickeditem.addEventListener('click',e => {//クリックしたliのaだけを見る
     // a要素のリンク先に遷移する規定の動作をキャンセルするため
     e.preventDefault();
     // console.log(clickeditem);
     desItems.forEach(item =>{//３つ全部のliのaを見る
       console.log(item);
       item.classList.remove('active');
     });
     clickeditem.classList.add('active');
 
     contents.forEach(content => {
       content.classList.remove('active');
     });
     document.getElementById(clickeditem.dataset.id).classList.add('active');
   });
 });

  // targetとrootの交差に関するAPI
  // targetは画像、rootはviewport=ウインドウ
  const targets=document.querySelectorAll('section');
  
  function callback(entries,obs){//交差したtargetは引数で受け取れる（配列で）
    // デフォルトだとtargetがrootに0%交差したときに実行される
    console.log(entries);
    //監視開始時は全てのtargetが入っている、交差したときは交差したtargetだけが入る
    entries.forEach(entry =>{
      if(!entry.isIntersecting){
        return;
      }
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);//監視を止める
    });
  }

  const options = {//オブジェクト形式
    threshold: 0.3,
  };
  //始まった時も実行される
  const observer= new IntersectionObserver(callback,options);
  targets.forEach(target => {
    observer.observe(target);
  });
}