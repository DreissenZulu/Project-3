INSERT INTO user (firstName, lastName, email, password, bio, city, country) VALUES 
('Richard', 'Koln', 'rkoln@test.com', 'rkoln','Proffessional foodie, looking to put my skills to greater use', 'Toronto', 'Canada'),
('Donald', 'Gaffer', 'donald@test.com', 'password','Front End web developer, with a great eye for design', 'New York', 'USA'),
('Chris', 'Benoit', 'benoit@test.com', 'domicide','Wrestler, Fighter, Macho man', 'Nebraska', 'USA');

INSERT INTO savedjobs (jobtitle, userid) VALUES 
('Full stack web developer', 2),('Junior Chef', 1), ('WWE Diva', 3), ('Food Taster', 1), ('Web designer', 2);

INSERT INTO links (userid, link1, link2, link3) VALUES 
(1, 'youtube.com','linkedin.com','twitter.com'),
(2, 'instagram.com', 'github.com', 'pastell.com');

INSERT INTO comments (comment_text, poster_id, commenton_id) VALUES 
('smarty pants', 1,2),
('Hope you get a job', 3, 2),
('Do you even lift bro', 2,3 );	

INSERT INTO replies (reply_text, comment_id, reply_poster_id) VALUES 
('all the time', 3, 3);