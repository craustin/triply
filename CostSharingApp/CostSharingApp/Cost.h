//
//  Cost.h
//  CostSharingApp
//
//  Created by Craig Austin on 11/13/12.
//  Copyright (c) 2012 Craig Austin. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Cost : NSObject

-(id)init;
-(id)initWithTitle:(NSString *)title value:(NSNumber *)value people:(NSMutableArray *)people;

@property (nonatomic) NSString *title;
@property (nonatomic) NSString *paidBy;
@property (nonatomic) NSNumber *value;
@property (nonatomic) NSMutableArray *people;

@end
