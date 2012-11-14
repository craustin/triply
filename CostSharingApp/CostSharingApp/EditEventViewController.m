//
//  EditEventViewController.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/11/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "EditEventViewController.h"

@interface EditEventViewController () {
    Event *_currentEvent;
    id<EventEditable> _parent;
}

@property (weak, nonatomic) IBOutlet UINavigationItem *navBar;
@property (weak, nonatomic) IBOutlet UITextField *name;
@property (weak, nonatomic) IBOutlet UITextView *people;

@end

@implementation EditEventViewController

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
    
    if (_currentEvent)
    {
        [self.navBar setTitle:@"Edit Event"];
        [self.name setText:_currentEvent.name];
        
        NSMutableString *s = [[NSMutableString alloc] init];
        for (id person in _currentEvent.people)
            [s appendFormat:@"%@\n", person];
        [self.people setText:s];
    }
    else
        [self.navBar setTitle:@"New Event"];
}

-(BOOL)textFieldShouldReturn:(UITextField*)textField {
    [textField resignFirstResponder];
    return NO;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)cancelPressed:(id)sender {
    [self dismissViewControllerAnimated:YES completion:nil];
}

- (IBAction)savePressed:(id)sender {
    NSString *newName = [NSString stringWithString:self.name.text];
    NSString *trimPeople = [self.people.text stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
    NSArray *newPeople = [trimPeople componentsSeparatedByCharactersInSet:[NSCharacterSet newlineCharacterSet]];
    [_parent finishedEditing:newName people:newPeople];
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(void)setCurrentEvent:(Event *)event
{
    _currentEvent = event;
}

-(void)setEditableParent:(id<EventEditable>)parent
{
    _parent = parent;
}

@end
