class MinesweeperController < ApplicationController
    def index
    end
end

def input_tag( name, targetName )
    number_field_tag name, 10, class: "textbox", data: { minesweeper_target: targetName }, onkeydown: "if(event.key==='.'){event.preventDefault();}"
end