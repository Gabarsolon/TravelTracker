PGDMP         $            
    {            BucketListDB    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16571    BucketListDB    DATABASE     �   CREATE DATABASE "BucketListDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "BucketListDB";
                postgres    false            �            1259    16612 
   BucketList    TABLE     V   CREATE TABLE public."BucketList" (
    user_id integer,
    destination_id integer
);
     DROP TABLE public."BucketList";
       public         heap    postgres    false            �            1259    16582    Destination    TABLE     �   CREATE TABLE public."Destination" (
    destination_id integer NOT NULL,
    destination_country character varying(50) NOT NULL,
    destination_city character varying(100) NOT NULL,
    is_public boolean
);
 !   DROP TABLE public."Destination";
       public         heap    postgres    false            �            1259    16577    User    TABLE     �   CREATE TABLE public."User" (
    user_id integer NOT NULL,
    email character varying(100) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false                      0    16612 
   BucketList 
   TABLE DATA           ?   COPY public."BucketList" (user_id, destination_id) FROM stdin;
    public          postgres    false    216   �                 0    16582    Destination 
   TABLE DATA           i   COPY public."Destination" (destination_id, destination_country, destination_city, is_public) FROM stdin;
    public          postgres    false    215   �                  0    16577    User 
   TABLE DATA           D   COPY public."User" (user_id, email, username, password) FROM stdin;
    public          postgres    false    214   3       o           2606    16586    Destination Destination_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Destination"
    ADD CONSTRAINT "Destination_pkey" PRIMARY KEY (destination_id);
 J   ALTER TABLE ONLY public."Destination" DROP CONSTRAINT "Destination_pkey";
       public            postgres    false    215            m           2606    16581    User User_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    214            p           2606    16620 )   BucketList BucketList_destination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public."Destination"(destination_id);
 W   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_destination_id_fkey";
       public          postgres    false    3183    216    215            q           2606    16615 "   BucketList BucketList_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 P   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_user_id_fkey";
       public          postgres    false    214    3181    216                  x�3�4�2�4����� ��         e   x�3���M��L�t*M�H,J-.�,�2��:�f��%�''ō9��8C�+�|N��"��JN�Ҽ����)gh�#�O~��c^zjNj1P,F��� �9           "   x�3�,-N-2tH�M���K�υ�!$W� �
�     