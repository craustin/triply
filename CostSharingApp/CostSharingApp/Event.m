//
//  Event.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/12/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "Event.h"

@interface Event () {
    NSString *clearer;
    NSDictionary *owedToClearer;
}

@end

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
    clearer = @"Nobody Yet";
    owedToClearer = [[NSDictionary alloc] init];
}

-(float)getOwedForPerson:(NSString *)person
{
    assert([owedToClearer.allKeys containsObject:person]);
    NSNumber *value = [owedToClearer valueForKey:person];
    return [value floatValue];
}

-(NSString *)clearThroughPerson
{
    return clearer;
}

@end
