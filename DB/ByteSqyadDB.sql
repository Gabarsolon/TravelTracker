PGDMP     )                
    {            BucketListDB    15.2    15.2     	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16571    BucketListDB    DATABASE     �   CREATE DATABASE "BucketListDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "BucketListDB";
                postgres    false            �            1259    16667 
   BucketList    TABLE     V   CREATE TABLE public."BucketList" (
    user_id integer,
    destination_id integer
);
     DROP TABLE public."BucketList";
       public         heap    postgres    false            �            1259    16662    Destination    TABLE     %  CREATE TABLE public."Destination" (
    destination_id integer NOT NULL,
    destination_country character varying(50) NOT NULL,
    destination_city character varying(100) NOT NULL,
    is_public boolean,
    description character varying(255),
    destination_name character varying(255)
);
 !   DROP TABLE public."Destination";
       public         heap    postgres    false            �            1259    16661    Destination_destination_id_seq    SEQUENCE     �   ALTER TABLE public."Destination" ALTER COLUMN destination_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Destination_destination_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16656    User    TABLE     �   CREATE TABLE public."User" (
    user_id integer NOT NULL,
    email character varying(100) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    16655    User_user_id_seq    SEQUENCE     �   ALTER TABLE public."User" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215                      0    16667 
   BucketList 
   TABLE DATA           ?   COPY public."BucketList" (user_id, destination_id) FROM stdin;
    public          postgres    false    218   �                 0    16662    Destination 
   TABLE DATA           �   COPY public."Destination" (destination_id, destination_country, destination_city, is_public, description, destination_name) FROM stdin;
    public          postgres    false    217   �                 0    16656    User 
   TABLE DATA           D   COPY public."User" (user_id, email, username, password) FROM stdin;
    public          postgres    false    215   v                  0    0    Destination_destination_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."Destination_destination_id_seq"', 7, true);
          public          postgres    false    216                       0    0    User_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."User_user_id_seq"', 1, true);
          public          postgres    false    214            q           2606    16666    Destination Destination_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Destination"
    ADD CONSTRAINT "Destination_pkey" PRIMARY KEY (destination_id);
 J   ALTER TABLE ONLY public."Destination" DROP CONSTRAINT "Destination_pkey";
       public            postgres    false    217            o           2606    16660    User User_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    215            r           2606    16675 )   BucketList BucketList_destination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public."Destination"(destination_id);
 W   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_destination_id_fkey";
       public          postgres    false    217    3185    218            s           2606    16670 "   BucketList BucketList_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 P   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_user_id_fkey";
       public          postgres    false    3183    218    215                  x�3�4�2�4����� ��         ~  x�]SKr�@]ۧЎ��
! �J� ��ٱQl�XL��՟L�;p,mO���Gz�{Oz_=Ɉ���M݀�B���8@:t� ��}��8N ;X Zx(�=�����Kn21y4�آ�8�F�َzj
�H=#t��ι�l�9�xoy�Z-ew&��(��a�,[p��4uy�K^�V�dL[m0 8q�I\_��oL�u��t���V	ub��Q��$#)�h��ԟ�1fm2l2�i�d���Hs{}�;��V�#³e�\�>�C[���$��Wm)fqcIR�}(�p�S���s�/*��?�i�bAuUk5F+�Z9�^lR��p���Qf�ȿRȚ�qY�[��_�Q��CI�@��W��?ߍ���_�ڙ3lS�D�u����<U��r7�[m���}AxA{+�'�
��ϒ��7ƅf�7o��-��g�Y�G��DT��t;xv����q`��i��LHO6���I)���";4��,d�Ѿn>^^�#q
���U[=j�N����퍺����P(�p��LN+Vd]Wo�e�8o���F�ىϓ;�k�sP�u/5٫q�JgxT>ye�⠜�(��jz���j�B_���Y��|�(y���c1o��k**M�������޷1��]݋"E��g[��?C�:         "   x�3�,-N-2tH�M���K�υ�!$W� �
�     