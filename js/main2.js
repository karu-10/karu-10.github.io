'use strict';
{
  const menuItems=document.querySelectorAll('.menu li a');

  menuItems.forEach(clickedItem => {
    clickedItem.addEventListener('click',e =>{
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
      clickedItem.classList.add('active');
    });
  });

  window.onload = ()=>{
    const loader = document.getElementById('loader');
    loader.classList.add('loaded');
 }

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
}