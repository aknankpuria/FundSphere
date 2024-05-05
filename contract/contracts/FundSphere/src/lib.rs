#![no_std]

use soroban_sdk::{contract, contractimpl, log, symbol_short, token, Address, BytesN, Env, String, Symbol, Vec};

pub mod types;

const COUNTER: Symbol = symbol_short!("COUNTER");

pub fn increment(env: &Env) -> u32 {
    let mut count: u32 = env.storage().instance().get(&COUNTER).unwrap_or(0);

    count += 1;

    // log!(env, "count: {}", count);

    env.storage().persistent().set(&COUNTER, &count);


    count
}


#[contract]
pub struct Campaign;

#[contractimpl]
impl Campaign {
    pub fn create_campaign(env: Env , campaign: types::Campaign) -> u32 {
       campaign.owner.require_auth();

       let campaign_id = increment(&env);
       env.storage().persistent().set(&types::DataKey::Campaign(campaign_id),&campaign);
       env.storage().persistent().set(&types::DataKey::FundedAmount(campaign_id),&0);
       env.storage().persistent().set(&types::DataKey::AmountCollected(campaign_id),&0);
       env.storage().persistent().set(&types::DataKey::Funders(campaign_id),&Vec::<Address>::new(&env));

       campaign_id

    }
    pub fn get_campaign(env: Env, campaign_id: u32) -> types::Campaign {
        env.storage().persistent().get(&types::DataKey::Campaign(campaign_id)).unwrap()
    }
    pub fn get_funded_amount(env: Env, campaign_id: u32) -> Vec<i128> {
        env.storage().persistent().get(&types::DataKey::FundedAmount(campaign_id)).unwrap_or(Vec::new(&env))
    }
    pub fn get_amount_collected(env: Env, campaign_id: u32) -> i128 {
        env.storage().persistent().get(&types::DataKey::AmountCollected(campaign_id)).unwrap_or(0)
    }

    pub fn get_funders(env: Env, campaign_id: u32) -> Vec<Address> {
        env.storage().persistent().get(&types::DataKey::Funders(campaign_id)).unwrap_or(Vec::new(&env))
    }

    fn update_funded_amount(env: Env, campaign_id: u32, amount: i128) {
        let mut previous_funded_amount = Campaign::get_funded_amount(env.clone(),campaign_id);
        previous_funded_amount.push_back(amount);
        
        env.storage().persistent().set(&types::DataKey::FundedAmount(campaign_id),&previous_funded_amount);
    }

    fn update_amount_collected(env: Env, campaign_id: u32, amount: i128) {
        let previous_amount_collected = Campaign::get_amount_collected(env.clone(),campaign_id) + amount;
        env.storage().persistent().set(&types::DataKey::AmountCollected(campaign_id),&previous_amount_collected);
    }   

    fn update_funders(env: Env, campaign_id: u32, funder: Address) {
        let mut previous_funders = Campaign::get_funders(env.clone(),campaign_id);
        previous_funders.push_back(funder);
        env.storage().persistent().set(&types::DataKey::Funders(campaign_id),&previous_funders);
    }
   

    pub fn fund_to_campaign(env: Env, campaign_id: u32, amount: i128 , from: Address ) {
         let campaign = Campaign::get_campaign(env.clone(), campaign_id); 
         let deadline = campaign.deadline;
         if deadline < env.ledger().timestamp() {
             panic!("Campaign deadline has passed");
         }  
         
        from.require_auth();
        let token_address = Address::from_string(&String::from_str(&env, "CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA"));
        let token = token::Client::new(&env, &token_address);
       let owner = campaign.owner;
        token.transfer(&from, &owner, &amount);

        Campaign::update_funded_amount(env.clone(), campaign_id, amount);
        Campaign::update_amount_collected(env.clone(), campaign_id, amount);
        Campaign::update_funders(env, campaign_id, from);

    }
    
    
}



mod test;
