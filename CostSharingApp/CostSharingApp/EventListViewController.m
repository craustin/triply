//
//  ViewController.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/10/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "EventListViewController.h"
#import "EventDetailViewController.h"
#import "EditEventViewController.h"
#import "EventList.h"

@interface EventListViewController () {
    EventList *eventList;
}

@end

@implementation EventListViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.navigationItem.rightBarButtonItem = self.editButtonItem;
    eventList = [[EventList alloc] init];
}

-(void)viewWillAppear:(BOOL)animated
{
    [self.tableView reloadData];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [eventList getCount];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle
                                      reuseIdentifier:CellIdentifier];
    }
    cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    
    Event *e = [eventList getEventAtIndex:[indexPath row]];
    cell.textLabel.text = e.name;
    cell.detailTextLabel.text = e.lastUpdated;
    return cell;
}

- (void)tableView:(UITableView *)tv didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [self performSegueWithIdentifier:@"segueEventDetails" sender:indexPath];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([[segue identifier] isEqualToString:@"segueEventDetails"])
    {
        EventDetailViewController *edvc = [segue destinationViewController];
        NSIndexPath *indexPath = sender;
        Event *e = [eventList getEventAtIndex:[indexPath row]];
        [edvc setCurrentEvent:e parent:self];
    }
    else if ([[segue identifier] isEqualToString:@"segueNewEvent"])
    {
        EditEventViewController *eevc = [segue destinationViewController];
        [eevc setCurrentEvent:nil];
        [eevc setEditableParent:self];
    }
}

-(void)finishedEditing:(NSString *)name people:(NSArray *)people
{
    // TODO: use today's date (and update lastUpdated where appropriate)
    [eventList addEvent:name lastUpdated:@"November 11th, 2012" people:people];
}

@end
