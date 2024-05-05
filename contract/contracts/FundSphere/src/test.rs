#![cfg(test)]

use super::*;
use soroban_sdk::xdr::Type;
use soroban_sdk::{symbol_short, vec, Env , Address, BytesN, String , Symbol, Vec, IntoVal};
use soroban_sdk::testutils::{Address as AddressTest, Ledger, Logs};

#[test]
fn create_campaign() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None,Campaign);
    let client = CampaignClient::new(&env, &contract_id);



    let id = client.create_campaign(&mock(&env));
    assert_eq!(id, 1);



}
#[test]
fn get_campaign(){
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None,Campaign);
    let client = CampaignClient::new(&env, &contract_id);
    let mocked_campaign = mock(&env);
    let id = client.create_campaign(&mocked_campaign);
    assert_eq!(id, 1);

    let campaign = client.get_campaign(&id);
    assert_eq!(campaign, mocked_campaign);

}
#[test]
fn fund_to_campaign () {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None,Campaign);
    let client = CampaignClient::new(&env, &contract_id);
    let mocked_campaign = mock(&env);
    let id = client.create_campaign(&mocked_campaign);

     client.fund_to_campaign(&id, &500, &Address::generate(&env));
    
}

fn mock (env: &Env) -> types::Campaign {
    types::Campaign {
        owner :Address::generate(&env),
        description :String::from_str(&env, "hellu"),
        title : String::from_str(&env,"Dev"),
        target_amount : 100,
        deadline : 0,
        image : String::from_str(  &env ,"")
    }
}
