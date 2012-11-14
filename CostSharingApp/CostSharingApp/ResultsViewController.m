//
//  ResultsViewController.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/13/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "ResultsViewController.h"

@interface ResultsViewController ()

@property (weak, nonatomic) IBOutlet UITableView *tableView;

@end

@implementation ResultsViewController

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
    
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    
    [self.currentEvent refreshResults];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    return [NSString stringWithFormat:@"Through %@", self.currentEvent.clearThroughPerson];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.currentEvent.people.count - 1;
}

- (UITableViewCell *)tableView:(UITableView *)tv cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [tv dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil)
    {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault
                                      reuseIdentifier:CellIdentifier];
    }
    
    NSUInteger row = [indexPath row];
    
    // skip the clearer
    int clearerIndex = [self.currentEvent.people indexOfObject:self.currentEvent.clearThroughPerson];
    if (row >= clearerIndex)
        row += 1;
    
    NSString *person = [self.currentEvent.people objectAtIndex:row];
    
    NSString *statement;
    float owes = [self.currentEvent getOwedForPerson:person];
    if (owes < 0)
        statement = [NSString stringWithFormat:@"%@ receives %.2f", person, -owes];
    else
        statement = [NSString stringWithFormat:@"%@ pays %.2f", person, owes];
    cell.textLabel.text = statement;
    
    return cell;
}

@end
