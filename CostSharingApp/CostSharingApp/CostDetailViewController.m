//
//  CostDetailViewController.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/13/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "CostDetailViewController.h"
#import "EventDetailViewController.h"

@interface CostDetailViewController ()

@property (weak, nonatomic) IBOutlet UITextField *titleField;
@property (weak, nonatomic) IBOutlet UITextField *valueField;
@property (weak, nonatomic) IBOutlet UITextField *paidByField;
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet UITableView *staticTableView;


@end

@implementation CostDetailViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    return [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    self.staticTableView.delegate = self;
    self.staticTableView.dataSource = self;
    
    self.titleField.text = self.currentCost.title;
    self.paidByField.text = self.currentCost.paidBy;
    self.valueField.text = self.currentCost.value.stringValue;
}

-(void)viewWillDisappear:(BOOL)animated
{
    self.currentCost.title = [NSString stringWithString:self.titleField.text];
    self.currentCost.paidBy = [NSString stringWithString:self.paidByField.text];
    self.currentCost.value = [NSNumber numberWithFloat:self.valueField.text.floatValue];
}

-(BOOL)textFieldShouldReturn:(UITextField*)textField {
    [textField resignFirstResponder];
    return NO;
}

- (IBAction)cancelPressed:(id)sender
{
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (IBAction)deletePressed:(id)sender
{
    [self.currentEvent.costs removeObject:self.currentCost];
    [self.navigationController popViewControllerAnimated:YES];
}

- (IBAction)savePressed:(id)sender
{
    if (![self.currentEvent.costs containsObject:self.currentCost])
        [self.currentEvent.costs addObject:self.currentCost];
    
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    if (tableView == self.tableView)
        return self.currentEvent.people.count;
    else
        return 3;
}

- (UITableViewCell *)tableView:(UITableView *)tv cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (tv == self.tableView)
        return [self createPersonRow:indexPath];
    else
        return [self createStaticRow:indexPath];
}

- (UITableViewCell *)createStaticRow:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [self.staticTableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil)
    {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleValue2
                                      reuseIdentifier:CellIdentifier];
    }
    
    NSUInteger row = [indexPath row];
    if (row == 0)
        cell.textLabel.text = @"Title";
    else if (row == 1)
        cell.textLabel.text = @"Paid By";
    else if (row == 2)
        cell.textLabel.text = @"Value";
    
    return cell;
}

- (UITableViewCell *)createPersonRow:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"Cell";
    UITableViewCell *cell = [self.tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil)
    {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault
                                      reuseIdentifier:CellIdentifier];
    }
    
    NSUInteger row = [indexPath row];
    NSString *person = [self.currentEvent.people objectAtIndex:row];
    cell.textLabel.text = person;
    
    cell.accessoryType = UITableViewCellAccessoryNone;
    if ([self.currentCost.people containsObject:person])
        cell.accessoryType = UITableViewCellAccessoryCheckmark;
    else
        cell.accessoryType = UITableViewCellAccessoryNone;
    
    return cell;
}

- (void)tableView:(UITableView *)tv didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSString* person = [tv cellForRowAtIndexPath:indexPath].textLabel.text;
    if (![self.currentCost.people containsObject:person])
        [self.currentCost.people addObject:person];
    else
        [self.currentCost.people removeObject:person];
    [self.tableView reloadData];
}

@end
