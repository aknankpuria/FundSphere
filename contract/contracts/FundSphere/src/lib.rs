// use soroban_sdk::{Context, Env, ReplyError};
// Import necessary modules and traits for testing
#![no_std]
use soroban_sdk::{contract, contractimpl,contracterror, symbol_short, vec, Address, Env, String, Symbol, Vec , Map, map};

#[contract]
pub struct FundSphere ;

pub struct Campaign {
    pub owner: Address,
    pub title: String,
    pub description: String,
    pub target: u64,
    pub deadline: u64, // Timestamp in seconds since epoch
    pub amount_collected: u64,
    pub image: String,
    pub funders: Vec<Address>,
    pub funded_amount: Vec<u64>,
}
// mapping of campaign id to campaign
pub struct Campaigns {
    pub campaigns: Map<u64, Campaign>,
}

pub fn create_campaign( owner: Address, title: String, description: String, target: u64, deadline: u64, image: String) -> Result<(), soroban_sdk::Error> {
    // Create a new campaign
    let campaign = Campaign {
        owner,
        title,
        description,
        target,
        deadline,
        amount_collected: 0,
        image,
        funders: vec![],
        funded_amount: vec![],
    };
    // Add the campaign to the mapping
    let mut campaigns = Campaigns::default();
    Ok(())
}

