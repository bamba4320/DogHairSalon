use BarberShop
--create tables
create table Users(user_user_id smallint identity(1,1) not null, user_username nvarchar(20),user_password nvarchar(20), user__name nvarchar(20))
create table Appointments(appointment_id smallint identity(1,1) not null, appointment_user_id smallint not null, appointment_time datetime)

--applying primary keys
alter table Users add constraint UID_PK primary key (user_user_id)
alter table Appointments add constraint APP_PK primary key (appointment_id)

--applying foreign keys
alter table Appointments add constraint A_UID_FK foreign key (appointment_user_id) references [dbo].[Users]([user_user_id])

--applying unique constraint
alter table Users add constraint uniq_name unique (user_username)
alter table Users add constraint uniq_user unique (user_username, user_password)  

