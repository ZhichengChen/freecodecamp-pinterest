$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 200,
  gutter: 10
});
$('img').error(function(){
    $(this).attr('src', '/images/placeholder.png');
});