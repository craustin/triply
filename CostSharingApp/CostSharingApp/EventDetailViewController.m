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
#import "CostDetailViewController.h"

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
    self.tableView.dataSource = self;
    self.tableView.delegate = self;
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
    return _currentEvent.costs.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue1
                                      reuseIdentifier:CellIdentifier];
    }
    cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    
    Cost *cost = [_currentEvent.costs objectAtIndex:[indexPath row]];
    cell.textLabel.text = cost.title;
    cell.detailTextLabel.text = [NSString stringWithFormat:@"%@", cost.value];
    return cell;
}

- (void)tableView:(UITableView *)tv didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [self performSegueWithIdentifier:@"segueCostDetails" sender:indexPath];
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([segue.identifier isEqualToString:@"segueEditEvent"])
    {
        EditEventViewController *eevc = [segue destinationViewController];
        [eevc setCurrentEvent:_currentEvent];
        [eevc setEditableParent:self];
    }
    else if ([segue.identifier isEqualToString:@"segueCostDetails"])
    {
        NSIndexPath *indexPath = sender;
        Cost *selectedCost = [_currentEvent.costs objectAtIndex:[indexPath row]];
        CostDetailViewController *cdvc = [segue destinationViewController];
        cdvc.currentCost = selectedCost;
        cdvc.currentEvent = _currentEvent;
        cdvc.currentParent = self;
    }
    else if ([segue.identifier isEqualToString:@"segueNewCost"])
    {
        CostDetailViewController *cdvc = [segue destinationViewController];
        cdvc.currentCost = [[Cost alloc] init];
        cdvc.currentEvent = _currentEvent;
        cdvc.currentParent = self;
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
    _currentEvent.people = people;
    self.title = name;
    //TODO: [_parent.tableView reloadData];
}

@end
