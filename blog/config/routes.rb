Rails.application.routes.draw do

  root "main_page#index"

  get "/articles", to: "articles#index"
  get "/minesweeper", to: "minesweeper#index"

  resources :articles do
    resources :comments
  end
  # get "/articles", to: "articles#index"
  # get "/articles/:id", to: "articles#show"
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
