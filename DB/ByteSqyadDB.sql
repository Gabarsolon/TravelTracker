PGDMP     3    6                 |            BucketListDB    15.2    15.2 )    /           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            0           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            1           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            2           1262    16571    BucketListDB    DATABASE     �   CREATE DATABASE "BucketListDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "BucketListDB";
                postgres    false            �            1259    16667 
   BucketList    TABLE     �   CREATE TABLE public."BucketList" (
    user_id integer,
    destination_id integer,
    description character varying(255),
    destination_in_list_id integer NOT NULL
);
     DROP TABLE public."BucketList";
       public         heap    postgres    false            �            1259    24976 %   BucketList_destination_in_list_id_seq    SEQUENCE     �   ALTER TABLE public."BucketList" ALTER COLUMN destination_in_list_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BucketList_destination_in_list_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    16662    Destination    TABLE     %  CREATE TABLE public."Destination" (
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
            public          postgres    false    217            �            1259    24875    TipsAndTricks    TABLE     �   CREATE TABLE public."TipsAndTricks" (
    tips_and_trick_id integer NOT NULL,
    user_id integer,
    destination_id integer,
    comment character varying(255) NOT NULL
);
 #   DROP TABLE public."TipsAndTricks";
       public         heap    postgres    false            �            1259    24874 #   TipsAndTricks_tips_and_trick_id_seq    SEQUENCE     �   ALTER TABLE public."TipsAndTricks" ALTER COLUMN tips_and_trick_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."TipsAndTricks_tips_and_trick_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    16656    User    TABLE     �   CREATE TABLE public."User" (
    user_id integer NOT NULL,
    email character varying(100) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    24903 
   User_Votes    TABLE     a   CREATE TABLE public."User_Votes" (
    user_id integer NOT NULL,
    vote_id integer NOT NULL
);
     DROP TABLE public."User_Votes";
       public         heap    postgres    false            �            1259    16655    User_user_id_seq    SEQUENCE     �   ALTER TABLE public."User" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    24891    Vote    TABLE     �   CREATE TABLE public."Vote" (
    vote_id integer NOT NULL,
    destination_id integer,
    month integer NOT NULL,
    number integer NOT NULL
);
    DROP TABLE public."Vote";
       public         heap    postgres    false            �            1259    24890    Vote_vote_id_seq    SEQUENCE     �   ALTER TABLE public."Vote" ALTER COLUMN vote_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Vote_vote_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            &          0    16667 
   BucketList 
   TABLE DATA           d   COPY public."BucketList" (user_id, destination_id, description, destination_in_list_id) FROM stdin;
    public          postgres    false    218   s3       %          0    16662    Destination 
   TABLE DATA           �   COPY public."Destination" (destination_id, destination_country, destination_city, is_public, description, destination_name) FROM stdin;
    public          postgres    false    217   �3       (          0    24875    TipsAndTricks 
   TABLE DATA           ^   COPY public."TipsAndTricks" (tips_and_trick_id, user_id, destination_id, comment) FROM stdin;
    public          postgres    false    220   -6       #          0    16656    User 
   TABLE DATA           D   COPY public."User" (user_id, email, username, password) FROM stdin;
    public          postgres    false    215   �6       +          0    24903 
   User_Votes 
   TABLE DATA           8   COPY public."User_Votes" (user_id, vote_id) FROM stdin;
    public          postgres    false    223   !7       *          0    24891    Vote 
   TABLE DATA           H   COPY public."Vote" (vote_id, destination_id, month, number) FROM stdin;
    public          postgres    false    222   H7       3           0    0 %   BucketList_destination_in_list_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."BucketList_destination_in_list_id_seq"', 9, true);
          public          postgres    false    224            4           0    0    Destination_destination_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."Destination_destination_id_seq"', 33, true);
          public          postgres    false    216            5           0    0 #   TipsAndTricks_tips_and_trick_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."TipsAndTricks_tips_and_trick_id_seq"', 5, true);
          public          postgres    false    219            6           0    0    User_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."User_user_id_seq"', 1, true);
          public          postgres    false    214            7           0    0    Vote_vote_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Vote_vote_id_seq"', 312, true);
          public          postgres    false    221            �           2606    24978    BucketList BucketList_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_pkey" PRIMARY KEY (destination_in_list_id);
 H   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_pkey";
       public            postgres    false    218            �           2606    16666    Destination Destination_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Destination"
    ADD CONSTRAINT "Destination_pkey" PRIMARY KEY (destination_id);
 J   ALTER TABLE ONLY public."Destination" DROP CONSTRAINT "Destination_pkey";
       public            postgres    false    217            �           2606    24879     TipsAndTricks TipsAndTricks_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."TipsAndTricks"
    ADD CONSTRAINT "TipsAndTricks_pkey" PRIMARY KEY (tips_and_trick_id);
 N   ALTER TABLE ONLY public."TipsAndTricks" DROP CONSTRAINT "TipsAndTricks_pkey";
       public            postgres    false    220            �           2606    24907    User_Votes User_Votes_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."User_Votes"
    ADD CONSTRAINT "User_Votes_pkey" PRIMARY KEY (user_id, vote_id);
 H   ALTER TABLE ONLY public."User_Votes" DROP CONSTRAINT "User_Votes_pkey";
       public            postgres    false    223    223            ~           2606    16660    User User_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    215            �           2606    24897 "   Vote Vote_destination_id_month_key 
   CONSTRAINT     r   ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_destination_id_month_key" UNIQUE (destination_id, month);
 P   ALTER TABLE ONLY public."Vote" DROP CONSTRAINT "Vote_destination_id_month_key";
       public            postgres    false    222    222            �           2606    24895    Vote Vote_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (vote_id);
 <   ALTER TABLE ONLY public."Vote" DROP CONSTRAINT "Vote_pkey";
       public            postgres    false    222            �           2606    24968     Destination destination_name_unq 
   CONSTRAINT     {   ALTER TABLE ONLY public."Destination"
    ADD CONSTRAINT destination_name_unq UNIQUE (destination_name, destination_city);
 L   ALTER TABLE ONLY public."Destination" DROP CONSTRAINT destination_name_unq;
       public            postgres    false    217    217            �           2606    24948 )   BucketList BucketList_destination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public."Destination"(destination_id) ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_destination_id_fkey";
       public          postgres    false    217    3200    218            �           2606    16670 "   BucketList BucketList_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 P   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_user_id_fkey";
       public          postgres    false    3198    218    215            �           2606    24958 /   TipsAndTricks TipsAndTricks_destination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."TipsAndTricks"
    ADD CONSTRAINT "TipsAndTricks_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public."Destination"(destination_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."TipsAndTricks" DROP CONSTRAINT "TipsAndTricks_destination_id_fkey";
       public          postgres    false    220    3200    217            �           2606    24880 (   TipsAndTricks TipsAndTricks_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."TipsAndTricks"
    ADD CONSTRAINT "TipsAndTricks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 V   ALTER TABLE ONLY public."TipsAndTricks" DROP CONSTRAINT "TipsAndTricks_user_id_fkey";
       public          postgres    false    215    220    3198            �           2606    24908 "   User_Votes User_Votes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_Votes"
    ADD CONSTRAINT "User_Votes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 P   ALTER TABLE ONLY public."User_Votes" DROP CONSTRAINT "User_Votes_user_id_fkey";
       public          postgres    false    223    3198    215            �           2606    24913 "   User_Votes User_Votes_vote_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_Votes"
    ADD CONSTRAINT "User_Votes_vote_id_fkey" FOREIGN KEY (vote_id) REFERENCES public."Vote"(vote_id);
 P   ALTER TABLE ONLY public."User_Votes" DROP CONSTRAINT "User_Votes_vote_id_fkey";
       public          postgres    false    222    3210    223            �           2606    24953    Vote Vote_destination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public."Destination"(destination_id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Vote" DROP CONSTRAINT "Vote_destination_id_fkey";
       public          postgres    false    3200    222    217            &      x�3�4���4�2�41��b���� +zq      %   ~  x�]SKr�@]ۧЎ��
! �J� ��ٱQl�XL��՟L�;p,mO���Gz�{Oz_=Ɉ���M݀�B���8@:t� ��}��8N ;X Zx(�=�����Kn21y4�آ�8�F�َzj
�H=#t��ι�l�9�xoy�Z-ew&��(��a�,[p��4uy�K^�V�dL[m0 8q�I\_��oL�u��t���V	ub��Q��$#)�h��ԟ�1fm2l2�i�d���Hs{}�;��V�#³e�\�>�C[���$��Wm)fqcIR�}(�p�S���s�/*��?�i�bAuUk5F+�Z9�^lR��p���Qf�ȿRȚ�qY�[��_�Q��CI�@��W��?ߍ���_�ڙ3lS�D�u����<U��r7�[m���}AxA{+�'�
��ϒ��7ƅf�7o��-��g�Y�G��DT��t;xv����q`��i��LHO6���I)���";4��,d�Ѿn>^^�#q
���U[=j�N����퍺����P(�p��LN+Vd]Wo�e�8o���F�ىϓ;�k�sP�u/5٫q�JgxT>ye�⠜�(��jz���j�B_���Y��|�(y���c1o��k**M�������޷1��]݋"E��g[��?C�:      (   �   x�%�=�0F���ԭhU����!A�A��5T���=�+l^B�R����*4��~�EJ���<ql�2p	�p_Y�r�-q�d�*l��L�$�0'���R���B�[�ѵ{�~
�Mڕ3G�+d"�e";�t�)^�tv�,�'?��$|H�����ܼ�?��N�      #   "   x�3�,-N-2tH�M���K�υ�!$W� �
�      +      x�3�4�2�4bc�=... "      *     x�%��qAߍ1�����o�*Q�c��� _�_+T�g�RE}V�TD[��m����+q��$�A�R��s�Rub�'�^�k��ta@>�Aл*���")+��bү���%�+�^aH�-`l���8c�/`H�-a�Y�C҄q7a2'�C��pH�0�
���̑0.��q���ˆ
�[�V0���㑠`��-[
�Jm���T�z�,�o8t�5 �?�����ٳc'h��D-F0� M-�C#���c������R�     