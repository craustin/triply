$(function(){

  // Make fields editable
  $.fn.editable.defaults.mode = 'inline';
  $('#trip-name').editable({ emptytext: 'Trip Name' });
  $('#edit-cost-name').editable({ emptytext: 'Name' });
  $('#edit-cost-cost').editable({ emptytext: 'Cost' });
  $('#edit-cost-paid-by').editable({
    source: ['Craig', 'Xiaoyi', 'Jim', 'Wendy'],
    emptytext: 'Paid By'
  });
  $('#edit-cost-paid-for').editable({ emptytext: 'Paid For' });
  $('#new-person-name').editable({ emptytext: 'Name' });

});