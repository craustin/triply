//
//  EventDetailViewController.h
//  CostSharingApp
//
//  Created by Craig Austin on 11/11/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "EventList.h"
#import "EditEventViewController.h"
#import "EventListViewController.h"

@interface EventDetailViewController : UIViewController <EventEditable>

-(void)setCurrentEvent:(Event *)event parent:(EventListViewController *)parent;

@end
