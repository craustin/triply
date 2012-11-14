//
//  Cost.m
//  CostSharingApp
//
//  Created by Craig Austin on 11/13/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import "Cost.h"

@implementation Cost

-(id)init
{
    NSMutableArray *emptyPeople = [[NSMutableArray alloc] init];
    return [self initWithTitle:@"" paidBy:@"" value:nil people:emptyPeople];
}

-(id)initWithTitle:(NSString *)title paidBy:(NSString *)paidBy value:(NSNumber *)value people:(NSMutableArray *)people
{
    self = [super init];
    self.title = title;
    self.paidBy = paidBy;
    self.value = value;
    self.people = people;
    return self;
}

@end
