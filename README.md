# rubyblog
Just a simple repo testing out Ruby On Rails. Below are notes for myself for future reference~

* Ruby on Rails utilizes a MVC framework similar to the ones I used in Joomla. However, it is more sophisticated than Joomla and allows for more efficient and useful commands and less repetitivity. For example, models can be referenced by name and there are commands to easily do commands in the controllers.
* The downside at the moment, is that Ruby On Rails, surprise surprise, utilizes Ruby as one of its main languages. Although Ruby is very similar to Python, it has its own syntax and is more usable in an object-oriented programming environment I believe.

# Things to note in Ruby On Rails if I ever come back
* The routes in routes.rb designate the pathing/urls for the website. It's very useful in getting a bird's eye view of the website and directing webpage urls
* Most coding and stuff happens in the app folder (this includes the MVC stuff as well)
* The models are more like DB objects, similar to a dataframe in Python, where you can extract info and query the model. I also believe you can just assign it a variable and call it whenever you want, which is pretty convinient
* The controllers are simple to use since there are a lot of functions that make it a lot cleaner. They basically are like action functions that are called whenever that action is called in the website (be it new, create, edit, etc.) It helps with streamlining the flow of the controller and what does what
* Views are simple HTML pages. However, a great addition is that you can add Ruby code within the HTML to retrieve your model/variables or run code. It's also not that bad and just needs a two % signs at the end of the tag to designate it as ruby code. Plus, there are a bunch of Ruby on Rails functions you can call to just plop tags and other basic HTML components, which is super helpful
* In addition, similar HTML components can be put into a singular file and called to import it to any other HTML page. This reduces repetitivity and improves the code.
* One big thing is that all imports and dependencies are all handled by Ruby on Rails already, so we don't need to worry about it. We can just call anything we want and it'll hopefully automatically link it
* Javascript can still be utilized in Ruby on Rails, though the usage is still a bit hard for me to understand. However, I did implement a simple minesweeper game in JS and plugged it into the website with pretty good success
