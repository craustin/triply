//
//  EditEventViewController.h
//  CostSharingApp
//
//  Created by Craig Austin on 11/11/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "EventList.h"

@protocol EventEditable <NSObject, UITextFieldDelegate>

-(void)finishedEditing:(NSString *)name people:(NSArray *)people;

@end

@interface EditEventViewController : UIViewController

-(void)setCurrentEvent:(Event *)event;
-(void)setEditableParent:(id<EventEditable>)parent;

@end
