DELETE FROM messages;
DELETE FROM rooms_users;
DELETE FROM users;
DELETE FROM rooms;

INSERT INTO users(id, name, email, password) VALUES(1,'Test 1', 'test@test.com', '12345');
INSERT INTO users(id, name, email, password) VALUES(2,'Test 2', 'test2@test.com', '12345');

INSERT INTO rooms(id, name, key) VALUES(1,'Sala 1', '1');
INSERT INTO rooms(id, name, key) VALUES(2,'Sala 2', '2');

INSERT INTO rooms_users(id, room, user_id) VALUES (1,1,1);
INSERT INTO rooms_users(id, room, user_id) VALUES (2,1,2);
INSERT INTO rooms_users(id, room, user_id) VALUES (3,2,1);

INSERT INTO messages(id, room, user_id, message, dt_message) VALUES (1,1,1,'Message 1 - Room 1','2022-10-25 10:35PM');
INSERT INTO messages(id, room, user_id, message, dt_message) VALUES (2,2,1,'Message 1 - Room 2','2022-10-25 10:38PM');
INSERT INTO messages(id, room, user_id, message, dt_message) VALUES (3,1,2,'Message 2 - Room 1','2022-10-25 10:45PM');