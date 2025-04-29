use e-restaurant;


CREATE TABLE Category (
                          id_cat INT PRIMARY KEY  auto_increment,
                          name VARCHAR(100) NOT NULL,
                          description TEXT
);

CREATE TABLE Food (
                      id INT PRIMARY KEY auto_increment,
                      name VARCHAR(100) NOT NULL,
                      description TEXT NOT NULL ,
                      price float NOT NULL,
                      image TEXT NOT NULL,
                      id_cat INT NOT NULL,
                      FOREIGN KEY (id_cat) REFERENCES Category(id_cat)
);