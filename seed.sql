INSERT INTO user (firstName, lastName, email, password, bio, city, country, role, image_url, link1, link2, link3) VALUES 
('Richard', 'Koln', 'rkoln@test.com', 'rkoln','Proffessional foodie, looking to put my skills to greater use', 'Toronto', 'Canada', 'job seeker', 'www.images.com', 'youtube.com','linkedin.com','twitter.com'),
('Donald', 'Gaffer', 'donald@test.com', 'password','Front End web developer, with a great eye for design', 'New York', 'USA', 'job seeker', 'www.images.com', 'youtube.com','linkedin.com','twitter.com'),
('Chris', 'Benoit', 'benoit@test.com', 'domicide','Wrestler, Fighter, Macho man', 'Nebraska', 'USA', 'Talent hunter', 'www.images.com', 'youtube.com','linkedin.com','twitter.com');

INSERT INTO savedjobs (jobtitle, jobid, userid) VALUES 
('Full stack web developer',100, 2),('Junior Chef',101, 1), ('WWE Diva',102, 3), ('Food Taster',103, 1), ('Web designer',104, 2);

INSERT INTO comments (comment_text, poster_id, commenton_id) VALUES 
('smarty pants', 1,2),
('Hope you get a job', 3, 2),
('Do you even lift bro', 2,3 );	

INSERT INTO replies (reply_text, comment_id, reply_poster_id) VALUES 
('all the time', 3, 3);