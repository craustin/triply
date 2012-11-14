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
@property (weak, nonatomic) IBOutlet UITableView *tableView;

@end

@implementation CostDetailViewController

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
	// Do any additional setup after loading the view.
    
    self.tableView.delegate = self;
    self.tableView.dataSource = self;
    
    self.titleField.text = self.currentCost.title;
    self.valueField.text = self.currentCost.value.stringValue;
}

-(void)viewWillDisappear:(BOOL)animated
{
    self.currentCost.title = [NSString stringWithString:self.titleField.text];
    self.currentCost.value = [NSNumber numberWithFloat:self.valueField.text.floatValue];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
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
    
    //[self.currentParent.tableView reloadData];
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    return @"Participants";
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.currentEvent.people.count;
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
