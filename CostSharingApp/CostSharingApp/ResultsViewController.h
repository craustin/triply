//
//  ResultsViewController.h
//  CostSharingApp
//
//  Created by Craig Austin on 11/13/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Event.h"

@interface ResultsViewController : UIViewController <UITableViewDataSource, UITableViewDelegate>

@property (nonatomic) Event *currentEvent;

@end
