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
    self.title = @"";
    self.value = nil;
    self.people = [[NSMutableArray alloc] init];
    return self;
}

-(id)initWithTitle:(NSString *)title value:(NSNumber *)value people:(NSMutableArray *)people
{
    self.title = title;
    self.value = value;
    self.people = people;
    return self;
}

@end
