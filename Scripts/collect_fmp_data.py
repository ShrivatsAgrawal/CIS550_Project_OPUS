import pandas as pd
import requests
from tqdm.auto import tqdm
import time
import os
import json
from absl import flags, app

flags.DEFINE_integer('limit', None, 'How many stocks to query. If None all FMP stocks will be queried')
flags.DEFINE_integer('max_requests', 300, 'Maximum number of requests to query per minute')
flags.DEFINE_integer('articles_limit', 100, 'Maximum number of articles per company for the News table')
flags.DEFINE_integer('sentiment_limit', 1, 'Maximum number of sentiments per company for the Sentiment table. 1 will take the most recent')

flags.DEFINE_boolean('is_df', True, 'Stores everything as a Dataframe. Do not alter this except for debugging individual functions')
flags.DEFINE_boolean('create_all_tables', True, 'Creates all the tables, by quering everything. If individual tables are required, set this to False first.')

flags.DEFINE_string('path', 'raw_tables', 'Path to the output directory. Will be created if does not exist.')
flags.DEFINE_string('api_key_file', 'config.json', 'Path to the file containign your API Key (As a json)')

opts = flags.FLAGS

def get_stock_list(api_key, return_df=True):
    stock_list_data = requests.get(f'https://financialmodelingprep.com/api/v3/stock/list?apikey={api_key}').json()

    if return_df:
        return pd.DataFrame(stock_list_data)
    
    return stock_list_data

def get_company_data(api_key, symbol):
    company_data = requests.get(f'https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={api_key}').json()

    return company_data

def get_stock_peers(api_key, symbol):
    stock_peers = requests.get(f'https://financialmodelingprep.com/api/v4/stock_peers?symbol={symbol}&apikey={api_key}').json()

    return stock_peers

def get_company_news(api_key, symbol, articles_limit=100):
    company_news = requests.get(f'https://financialmodelingprep.com/api/v3/stock_news?tickers={symbol}&limit={articles_limit}&apikey={api_key}').json()
    
    return company_news

def get_company_sentiment(api_key, symbol, sentiment_limit=1):
    company_sentiments= requests.get(f'https://financialmodelingprep.com/api/v4/social-sentiment?symbol={symbol}&limit={sentiment_limit}&apikey={api_key}').json()

    return company_sentiments


def make_company_info(api_key, stock_list, limit=None, stock_list_is_df=True, return_df=True, max_requests=300):
    company_data = []
    itr = 0
    req = 0
    timer = time.time()

    if stock_list_is_df:
        for symbol in tqdm(stock_list['symbol']):
            company_data.extend(get_company_data(api_key, symbol))
            itr += 1
            req += 1

            if req >= max_requests and (time.time() - timer) < 60:
                time.sleep(60 - time.time() + timer)
                timer = time.time()
                req = 0
            
            if (time.time() - timer) > 60:
                req = 0
                timer = time.time()

            if limit is not None:
                if itr >= limit:
                    break

    else:
        for element in tqdm(stock_list):
            company_data.extend(get_company_data(api_key, element['symbol']))
            itr += 1
            req += 1

            if req >= max_requests and (time.time() - timer) < 60:
                time.sleep(60 - time.time() + timer)
                timer = time.time()
                req = 0
            
            if (time.time() - timer) > 60:
                req = 0
                timer = time.time()

            if limit is not None:
                if itr >= limit:
                    break
                
    if return_df:
        return pd.DataFrame(company_data)
    
    ## Inefficient, only for debugging
    return company_data


def make_stock_peers(api_key, stock_list, limit=None, stock_list_is_df=True, return_df=True, max_requests=300):
    company_peers = []
    itr = 0
    req = 0
    timer = time.time()

    if stock_list_is_df:
        for symbol in tqdm(stock_list['symbol']):
            company_peers.extend(get_stock_peers(api_key, symbol))
            itr += 1
            req += 1

            if req >= max_requests and (time.time() - timer) < 60:
                time.sleep(60 - time.time() + timer)
                timer = time.time()
                req = 0
            
            if (time.time() - timer) > 60:
                req = 0
                timer = time.time()

            if limit is not None:
                if itr >= limit:
                    break

    else:
        for element in tqdm(stock_list):
            company_peers.extend(get_stock_peers(api_key, element['symbol']))
            itr += 1
            req += 1

            if req >= max_requests and (time.time() - timer) < 60:
                time.sleep(60 - time.time() + timer)
                timer = time.time()
                req = 0
            
            if (time.time() - timer) > 60:
                req = 0
                timer = time.time()

            if limit is not None:
                if itr >= limit:
                    break      
    
    if return_df:
        return pd.DataFrame(company_peers)
    
    ## Inefficient, only for debugging
    return company_peers

def make_company_news(api_key, stock_list, articles_limit=100, limit=None, stock_list_is_df=True, return_df=True, max_requests=300):
    companies_news = []
    itr = 0
    req = 0
    timer = time.time()

    if stock_list_is_df:
        for symbol in tqdm(stock_list['symbol']):
            companies_news.extend(get_company_news(api_key, symbol, articles_limit))
            itr += 1
            req += 1

            if req >= max_requests and (time.time() - timer) < 60:
                time.sleep(60 - time.time() + timer)
                timer = time.time()
                req = 0
            
            if (time.time() - timer) > 60:
                req = 0
                timer = time.time()

            if limit is not None:
                if itr >= limit:
                    break

    else:
        for element in tqdm(stock_list):
            companies_news.extend(get_company_news(api_key, element['symbol'], articles_limit))
            itr += 1
            req += 1

            if req >= max_requests and (time.time() - timer) < 60:
                time.sleep(60 - time.time() + timer)
                timer = time.time()
                req = 0
            
            if (time.time() - timer) > 60:
                req = 0
                timer = time.time()

            if limit is not None:
                if itr >= limit:
                    break 
    
    if return_df:
        return pd.DataFrame(companies_news)
    
    ## Inefficient, only for debugging
    return companies_news

def make_company_sentiments(api_key, stock_list, sentiment_limit=1, limit=None, stock_list_is_df=True, return_df=True, max_requests=300):
    companies_sentiments = []
    itr = 0
    req = 0
    timer = time.time()

    if stock_list_is_df:
        for symbol in tqdm(stock_list['symbol']):
            companies_sentiments.extend(get_company_sentiment(api_key, symbol, sentiment_limit))
            itr += 1
            req += 1

            if req >= max_requests and (time.time() - timer) < 60:
                time.sleep(60 - time.time() + timer)
                timer = time.time()
                req = 0
            
            if (time.time() - timer) > 60:
                req = 0
                timer = time.time()

            if limit is not None:
                if itr >= limit:
                    break

    else:
        for element in tqdm(stock_list):
            companies_sentiments.extend(get_company_sentiment(api_key, element['symbol'], sentiment_limit))
            itr += 1
            req += 1

            if req >= max_requests and (time.time() - timer) < 60:
                time.sleep(60 - time.time() + timer)
                timer = time.time()
                req = 0
            
            if (time.time() - timer) > 60:
                req = 0
                timer = time.time()

            if limit is not None:
                if itr >= limit:
                    break 
    
    if return_df:
        return pd.DataFrame(companies_sentiments)
    
    ## Inefficient, only for debugging
    return companies_sentiments

def main(_):
    if opts.create_all_tables:
        if not opts.is_df:
            print('Script running in debugging mode, NOTHING will be saved. Please set is_df to True to save the tables')
        
        output_folder = opts.path
        if not os.path.isdir(output_folder):
            os.mkdir(output_folder)
        
        api_key_file = opts.api_key_file
        api_key = None

        if os.path.exists(api_key_file):
            with open(api_key_file, 'r') as apf:
                data = json.load(apf)
                api_key = data['api_key']
        else:
            print("Can not find the file containing the API Key. Paste Your API Key Below: ")
            api_key = input()
        
        stock_list = get_stock_list(api_key, opts.is_df)
        if opts.is_df:
            stock_list.to_csv(os.path.join(output_folder, 'stock_list.csv'))
        
        companies = make_company_info(api_key, stock_list, limit=opts.limit, stock_list_is_df=opts.is_df, return_df=opts.is_df, max_requests=opts.max_requests)
        if opts.is_df:
            companies.to_csv(os.path.join(output_folder,'company_info.csv'))
        
        peers = make_stock_peers(api_key, stock_list, limit=opts.limit, stock_list_is_df=opts.is_df, return_df=opts.is_df, max_requests=opts.max_requests)
        if opts.is_df:
            peers.to_csv(os.path.join(output_folder,'peer_list.csv'))
        
        news = make_company_news(api_key, stock_list, articles_limit=opts.articles_limit, limit=opts.limit, stock_list_is_df=opts.is_df, return_df=opts.is_df, max_requests=opts.max_requests)
        if opts.is_df:
            news.to_csv(os.path.join(output_folder,'stock_news.csv'))
            
        sentiments = make_company_sentiments(api_key, stock_list, sentiment_limit=opts.sentiment_limit, limit=opts.limit, stock_list_is_df=opts.is_df, return_df=opts.is_df, max_requests=opts.max_requests)
        if opts.is_df:
            sentiments.to_csv(os.path.join(output_folder,'stock_sentiments.csv'))
        
        if opts.is_df:
            print('Successfully queried all the tables. Saved the tables as CSV.')
        else:
            print('No Dataframes were returned, Nothing will be saved. Please set is_df to True to save the tables.')

if __name__ == '__main__':
    app.run(main)