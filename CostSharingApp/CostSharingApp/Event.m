//
//  Event.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/12/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "Event.h"
#import "Cost.h"

@interface Event () {
    NSString *clearer;
    NSDictionary *owedToClearer;
}

@end

@implementation Event

-(id)initWithName:(NSString *)name lastUpdated:(NSString *)lastUpdated people:(NSArray *)people
{
    self = [super init];
    self.name = name;
    self.lastUpdated = lastUpdated;
    self.people = people;
    self.costs = [[NSMutableArray alloc] init];
    return self;
}

-(void)refreshResults
{
    clearer = [self.people objectAtIndex:0];
    owedToClearer = [self getOwedDictionaryForClearer:clearer];
}

-(float)getOwedForPerson:(NSString *)person
{
    TODO: assert([owedToClearer.allKeys containsObject:person]);
    NSNumber *value = [owedToClearer valueForKey:person];
    return [value floatValue];
}

-(NSString *)clearThroughPerson
{
    return clearer;
}

-(NSDictionary *)getOwedDictionaryForClearer:(NSString *)clearer
{
    int payerIndex, receiverIndex;
    float valuePerPerson;
    float **paidFor = malloc(sizeof(float *) * self.people.count);
    for (int p_index = 0; p_index < self.people.count; p_index++)
        paidFor[p_index] = calloc(sizeof(float), self.people.count);
    
    for (int c_index = 0; c_index < self.costs.count; c_index++)
    {
        Cost *c = [self.costs objectAtIndex:c_index];
        
        assert(c.people.count > 0);
        valuePerPerson = c.value.floatValue / (float)c.people.count;
        payerIndex = [self.people indexOfObject:c.paidBy];
        
        for (int p_index = 0; p_index < c.people.count; p_index++)
        {
            NSString *p = [c.people objectAtIndex:p_index];
            receiverIndex = [self.people indexOfObject:p];
            if (payerIndex != receiverIndex)
                paidFor[payerIndex][receiverIndex] += valuePerPerson;
        }
    }
    
    NSMutableDictionary *result = [[NSMutableDictionary alloc] initWithCapacity:self.people.count];
    for (int p_index = 0; p_index < self.people.count; p_index++)
    {
        NSString *person = [self.people objectAtIndex:p_index];
        float owes = 0;
        for (int i = 0; i < self.people.count; i++)
            owes += paidFor[i][p_index] - paidFor[p_index][i];
        [result setValue:[NSNumber numberWithFloat:owes] forKey:person];
    }
    
    for (int p_index = 0; p_index < self.people.count; p_index++)
        free(paidFor[p_index]);
    free(paidFor);
    
    return result;
}

@end
