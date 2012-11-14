//
//  CostDetailViewController.h
//  CostSharingApp
//
//  Created by Craig Austin on 11/13/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Cost.h"
#import "Event.h"
#import "EventDetailViewController.h"

@interface CostDetailViewController : UIViewController <UITableViewDataSource, UITableViewDelegate>

@property (nonatomic) Event *currentEvent;
@property (nonatomic) Cost *currentCost;
@property (nonatomic) EventDetailViewController *currentParent;

@end
