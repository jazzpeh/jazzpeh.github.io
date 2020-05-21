require 'color_converter'

# Declare module of your plugin under Jekyll module
module Jekyll::CustomFilter

  # Generates a random colour
  def random_color(input)
    "#{input}#{Random.bytes(3).unpack1('H*')}"
  end

  # Takes in a hexadecimal colour and decide if the color needs a white or black font
  def font_color(input)
    r, g, b = ColorConverter.rgb(input)
    rgb = r*0.299 + g*0.587 + b*0.114
    if rgb > 186
      "#000000"
    else
      "#ffffff"
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomFilter)