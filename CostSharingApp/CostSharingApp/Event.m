//
//  Event.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/12/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "Event.h"

@implementation Event

-(id)initWithName:(NSString *)name lastUpdated:(NSString *)lastUpdated people:(NSArray *)people
{
    self.name = name;
    self.lastUpdated = lastUpdated;
    self.people = people;
    self.costs = [[NSMutableArray alloc] init];
    return self;
}

-(void)refreshResults
{
}

-(float)getOwedForPerson:(NSString *)person
{
    return 500.0;
}

-(NSString *)clearThroughPerson
{
    return @"Nobody Yet";
}

@end
