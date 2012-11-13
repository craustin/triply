//
//  EventList.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/11/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "EventList.h"

NSMutableArray *list;

@implementation EventList

-(id)init
{
    if (self = [super init])
    {
        NSArray *mexicoPeople = [[NSArray alloc] initWithObjects:@"Craig", @"Xiaoyi", @"Varun", @"Meghan", @"Yanka", @"Eric", @"Jillian", nil];
        Event *mexico = [[Event alloc] initWithName:@"Mexico" lastUpdated:@"March 3rd, 2012" people:mexicoPeople];
        
        NSArray *fffPeople = [[NSArray alloc] initWithObjects:@"Craig", @"Charles", @"Gunner", nil];
        Event *fffFest = [[Event alloc] initWithName:@"FunFunFunFest" lastUpdated:@"November 4th, 2012" people:fffPeople];
        
        list = [[NSMutableArray alloc] initWithObjects: mexico, fffFest, nil];
    }
    return self;
}

-(NSString *)getNameAtIndex:(int)index
{
    Event *e = [self getEventAtIndex:index];
    return e.name;
}

-(Event *)getEventAtIndex:(int)index
{
    return [list objectAtIndex:index];
}

-(int)getCount
{
    return [list count];
}

-(BOOL)addEvent:(NSString *)name lastUpdated:(NSString *)lastUpdated people:(NSArray *)people
{
    Event *e = [[Event alloc] initWithName:name lastUpdated:lastUpdated people:people];
    [list addObject:e];
    return YES;
}

@end
