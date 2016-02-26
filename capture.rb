output = ''
playlist_name = nil
number_of_videos = nil
current_video = 0
IO.popen('youtube-dl "https://www.youtube.com/playlist?list=PLjYlMSox7xeIVfx2l2R2sPJDHz7FMxuO-"') do |f|
	until f.eof?
		output += f.gets
		if playlist_name.nil?
			match_data = output.match(/^\[download\] Downloading playlist: (\S*)$/)
			if not match_data.nil?
				playlist_name = match_data.captures[0]
				puts "Found playlist name: " + playlist_name
			end
		end
		if number_of_videos.nil?
			match_data = output.match(/^\[youtube:playlist\] playlist \S* Downloading (\d*) videos$/)
			if not match_data.nil?
				number_of_videos = match_data.captures[0].to_i
				puts "Number of videos: #{number_of_videos}"
			end
		end
		match_data = output.match(/^\[download\] Downloading video (\d*) of \d*$/)
		if not match_data.nil?
			current_video = match_data.captures[0].to_i
			offsets = match_data.offset(0)
			output = output[offsets[1]..output.length]
			puts "Downloading: #{current_video}"
		end
	end
end
