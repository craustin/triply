//
//  Event.h
//  CostSharingApp
//
//  Created by Craig Austin on 11/12/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Event : NSObject

-(id)initWithName:(NSString *)name lastUpdated:(NSString *)lastUpdated people:(NSArray *)people;

@property (nonatomic) NSString *name;
@property (nonatomic) NSString *lastUpdated;
@property (nonatomic) NSArray *people;
@property (nonatomic) NSMutableArray *costs;

@end
