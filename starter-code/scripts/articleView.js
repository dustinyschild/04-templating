'use strict';

var articleView = {};

articleView.populateFilters = function() {
  var authors = {
    filterName: 'author'
    ,option: []
  };
  var categories = {
    filterName: 'category'
    ,option: []
  };
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      authors.option.push($(this).find('address a').text());
      categories.option.push($(this).attr('data-category'));
    }
  });
  var filters = [authors,categories]
  filters.forEach(function(item){
    var templateScript = $('#filterTemplate').html();
    var template = Handlebars.compile(templateScript);
    var compiledHtml = template(item);
    $('#filters').append(compiledHtml);
  })
};

articleView.handleAuthorFilter = function() {
  $('#filters').on('change','select',function() {
    if ($(this).val()) {
      $('article').hide();
      if(this.id === 'author-filter'){
        $(`article[data-author="${$(this).val()}"]`).fadeIn();
        $('#category-filter').val('');
      }
      if(this.id === 'category-filter'){
        $(`article[data-category="${$(this).val()}"]`).fadeIn();
        $('#author-filter').val('');
      }
    }
    else {
      $('article').fadeIn();
      $('article.template').hide();
    }
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
