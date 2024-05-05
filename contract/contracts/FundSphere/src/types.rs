use soroban_sdk::{contracttype, Address, BytesN, String, Symbol, Val, Vec, Env, IntoVal };


#[contracttype]
#[derive(Clone, Debug , PartialEq)]
pub struct Campaign{
    pub owner: Address,
    pub description: String,
    pub title : String,
    pub target_amount: u64,
    pub deadline: u64,
    pub image : String,
   
}

#[contracttype]
pub enum DataKey {
    Campaign(u32),
    Funders(u32),
    FundedAmount(u32),
    AmountCollected(u32),
}


