//
//  EventDetailViewController.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/11/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "EventDetailViewController.h"
#import "EditEventViewController.h"
#import "EventListViewController.h"

@interface EventDetailViewController () {
    Event *_currentEvent;
    EventListViewController *_parent;
}

@end

@implementation EventDetailViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.title = _currentEvent.name;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([segue.identifier isEqualToString:@"segueEditEvent"])
    {
        EditEventViewController *eevc = [segue destinationViewController];
        [eevc setCurrentEvent:_currentEvent];
        [eevc setEditableParent:self];
    }
}

-(void)setCurrentEvent:(Event *)event parent:(EventListViewController *)parent
{
    _currentEvent = event;
    _parent = parent;
}

-(void)finishedEditing:(NSString *)name people:(NSArray *)people
{
    _currentEvent.name = name;
    self.title = name;
    [_parent.tableView reloadData];
}

@end
