module("SC.TemplateView", {
  setup: function() {
    // var view = SC.TemplateView.create();
  },

  teardown: function() {

  }
});

test("template view should call the function of the associated template", function() {
  var view;

  view = SC.TemplateView.create({
    templateName: 'test_template',

    templates: SC.Object.create({
      test_template: function(dataSource) {
        return "<h1 id='twas-called'>template was called</h1>";
      }
    })
  });

  view.createLayer();

  ok(view.$('#twas-called').length, "the named template was called");
});

test("template view should call the function of the associated template with itself as the context", function() {
  var view;

  view = SC.TemplateView.create({
    templateName: 'test_template',

    personName: "Tom DAAAALE",

    templates: SC.Object.create({
      test_template: function(dataSource) {
        return "<h1 id='twas-called'>template was called for " + dataSource.get('personName') + "</h1>";
      }
    })
  });

  view.createLayer();

  equals("template was called for Tom DAAAALE", view.$('#twas-called').text(), "the named template was called with the view as the data source");
});

test("template view defaults to a noop template", function() {
  var view;
  view = SC.TemplateView.create({});
  view.createLayer();

  equals(view.$().html(), '', "view div should be empty");
});

test("template views return YES to mouseDown if there is a mouseUp method", function() {
  var view = SC.TemplateView.create();

  ok(!view.tryToPerform('mouseDown'), "view returns NO if there is no mouseUp method");

  view = SC.TemplateView.create({
    mouseUp: function() { }
  });

  ok(view.tryToPerform('mouseDown'), "view returns YES if we add a mouseUp method");
});
