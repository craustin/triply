//
//  EventList.h
//  CostSharingApp
//
//  Created by Craig Austin on 11/11/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Event.h"

@interface EventList : NSObject

-(id)init;
-(NSString *)getNameAtIndex:(int)index;
-(Event *)getEventAtIndex:(int)index;
-(int)getCount;
-(BOOL)addEvent:(NSString *)name lastUpdated:(NSString *)lastUpdated people:(NSArray *)people;

@end
