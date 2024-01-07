PGDMP     #                     |            BucketListDB    15.2    15.2 *    1           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            2           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            3           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            4           1262    16571    BucketListDB    DATABASE     �   CREATE DATABASE "BucketListDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "BucketListDB";
                postgres    false            �            1259    16667 
   BucketList    TABLE     �   CREATE TABLE public."BucketList" (
    user_id bigint,
    destination_id bigint,
    description character varying(255),
    destination_in_list_id bigint NOT NULL
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
            public          postgres    false    218            �            1259    16662    Destination    TABLE     $  CREATE TABLE public."Destination" (
    destination_id bigint NOT NULL,
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
    tips_and_trick_id bigint NOT NULL,
    user_id bigint,
    destination_id bigint,
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
   User_Votes    TABLE     _   CREATE TABLE public."User_Votes" (
    user_id bigint NOT NULL,
    vote_id bigint NOT NULL
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
    vote_id bigint NOT NULL,
    destination_id bigint,
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
            public          postgres    false    222            (          0    16667 
   BucketList 
   TABLE DATA           d   COPY public."BucketList" (user_id, destination_id, description, destination_in_list_id) FROM stdin;
    public          postgres    false    218   �4       '          0    16662    Destination 
   TABLE DATA           �   COPY public."Destination" (destination_id, destination_country, destination_city, is_public, description, destination_name) FROM stdin;
    public          postgres    false    217   6       *          0    24875    TipsAndTricks 
   TABLE DATA           ^   COPY public."TipsAndTricks" (tips_and_trick_id, user_id, destination_id, comment) FROM stdin;
    public          postgres    false    220   �8       %          0    16656    User 
   TABLE DATA           D   COPY public."User" (user_id, email, username, password) FROM stdin;
    public          postgres    false    215   �9       -          0    24903 
   User_Votes 
   TABLE DATA           8   COPY public."User_Votes" (user_id, vote_id) FROM stdin;
    public          postgres    false    223   �9       ,          0    24891    Vote 
   TABLE DATA           H   COPY public."Vote" (vote_id, destination_id, month, number) FROM stdin;
    public          postgres    false    222   �9       5           0    0 %   BucketList_destination_in_list_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."BucketList_destination_in_list_id_seq"', 20, true);
          public          postgres    false    224            6           0    0    Destination_destination_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."Destination_destination_id_seq"', 58, true);
          public          postgres    false    216            7           0    0 #   TipsAndTricks_tips_and_trick_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public."TipsAndTricks_tips_and_trick_id_seq"', 5, true);
          public          postgres    false    219            8           0    0    User_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."User_user_id_seq"', 1, true);
          public          postgres    false    214            9           0    0    Vote_vote_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Vote_vote_id_seq"', 408, true);
          public          postgres    false    221            �           2606    24987    BucketList BucketList_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_pkey" PRIMARY KEY (destination_in_list_id);
 H   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_pkey";
       public            postgres    false    218            �           2606    24997    Destination Destination_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."Destination"
    ADD CONSTRAINT "Destination_pkey" PRIMARY KEY (destination_id);
 J   ALTER TABLE ONLY public."Destination" DROP CONSTRAINT "Destination_pkey";
       public            postgres    false    217            �           2606    25022     TipsAndTricks TipsAndTricks_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public."TipsAndTricks"
    ADD CONSTRAINT "TipsAndTricks_pkey" PRIMARY KEY (tips_and_trick_id);
 N   ALTER TABLE ONLY public."TipsAndTricks" DROP CONSTRAINT "TipsAndTricks_pkey";
       public            postgres    false    220            �           2606    25057    User_Votes User_Votes_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."User_Votes"
    ADD CONSTRAINT "User_Votes_pkey" PRIMARY KEY (user_id, vote_id);
 H   ALTER TABLE ONLY public."User_Votes" DROP CONSTRAINT "User_Votes_pkey";
       public            postgres    false    223    223            ~           2606    16660    User User_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    215            �           2606    25081 "   Vote Vote_destination_id_month_key 
   CONSTRAINT     r   ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_destination_id_month_key" UNIQUE (destination_id, month);
 P   ALTER TABLE ONLY public."Vote" DROP CONSTRAINT "Vote_destination_id_month_key";
       public            postgres    false    222    222            �           2606    25069    Vote Vote_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (vote_id);
 <   ALTER TABLE ONLY public."Vote" DROP CONSTRAINT "Vote_pkey";
       public            postgres    false    222            �           2606    25122     Destination destination_name_unq 
   CONSTRAINT     {   ALTER TABLE ONLY public."Destination"
    ADD CONSTRAINT destination_name_unq UNIQUE (destination_name, destination_city);
 L   ALTER TABLE ONLY public."Destination" DROP CONSTRAINT destination_name_unq;
       public            postgres    false    217    217            �           2606    25124 &   BucketList user_and_destination_id_unq 
   CONSTRAINT     v   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT user_and_destination_id_unq UNIQUE (user_id, destination_id);
 R   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT user_and_destination_id_unq;
       public            postgres    false    218    218            �           2606    25095 )   BucketList BucketList_destination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public."Destination"(destination_id) ON DELETE CASCADE;
 W   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_destination_id_fkey";
       public          postgres    false    3200    217    218            �           2606    25109 "   BucketList BucketList_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BucketList"
    ADD CONSTRAINT "BucketList_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 P   ALTER TABLE ONLY public."BucketList" DROP CONSTRAINT "BucketList_user_id_fkey";
       public          postgres    false    218    215    3198            �           2606    25027 /   TipsAndTricks TipsAndTricks_destination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."TipsAndTricks"
    ADD CONSTRAINT "TipsAndTricks_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public."Destination"(destination_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."TipsAndTricks" DROP CONSTRAINT "TipsAndTricks_destination_id_fkey";
       public          postgres    false    3200    220    217            �           2606    25036 (   TipsAndTricks TipsAndTricks_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."TipsAndTricks"
    ADD CONSTRAINT "TipsAndTricks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 V   ALTER TABLE ONLY public."TipsAndTricks" DROP CONSTRAINT "TipsAndTricks_user_id_fkey";
       public          postgres    false    3198    220    215            �           2606    25047 "   User_Votes User_Votes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_Votes"
    ADD CONSTRAINT "User_Votes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(user_id);
 P   ALTER TABLE ONLY public."User_Votes" DROP CONSTRAINT "User_Votes_user_id_fkey";
       public          postgres    false    215    223    3198            �           2606    25070 "   User_Votes User_Votes_vote_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User_Votes"
    ADD CONSTRAINT "User_Votes_vote_id_fkey" FOREIGN KEY (vote_id) REFERENCES public."Vote"(vote_id);
 P   ALTER TABLE ONLY public."User_Votes" DROP CONSTRAINT "User_Votes_vote_id_fkey";
       public          postgres    false    223    222    3212            �           2606    25082    Vote Vote_destination_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_destination_id_fkey" FOREIGN KEY (destination_id) REFERENCES public."Destination"(destination_id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Vote" DROP CONSTRAINT "Vote_destination_id_fkey";
       public          postgres    false    3200    217    222            (   #  x�5�K��0D��)� QDs�AB#l@��Mcw�v����Ƕ®?U�j��-�ڰ,�V�;�#���r�'8G .��s�6>p��j��	���'FԖ�c�H�vRU���൲)��ia]L�I"�7x��DlMd���X���EyËK���ہ'���v?v�~��Պ�
tk��sB(���T��nWW��#��\ST��%7o6)4�,(��H�($d�eגf�>�m�,)l�"/�3+�%��$�������qn.�v8��<�*/2f��o���Jn��      '   �  x�mTMo�0=˿��]\������m�f����L�E�}4���~���(�N�a7�"��#�^=���Mm��BT�� �-:��M�>?�G�;�x(����:�97�<�vlд��d"��l9�w����l�\�L�#9��xox�-)ev:�i)��a�,Sp66I���.y�(�r$��ƀଳ>���Չ�Z�����E���"A�֚�b�B] ��)LH��ԟ�1fm2�3�q�d�������wƵQ�#³a�\}P�ѡQ?�a���Wi)fqcI�](�p�c=��s�/"ٟ��i�ր�����,j��{kB�j(%߅���0kf�@��B�t���؁�Že�Z�/(	��U�g�O�w�#o}�/a��6�1z��Z}"/2��1n{c#�w�f�/[4��0~b� �$���F�P���-����W�2K������u�n�N]�j8���6-]�	����4)Ű!Wd�z���4�����Y'P�0\5�Q
�q���Z��͍����IS(�p�-LN+Vd]Vo�e�8m���Z��Y�'w���9f/#<�^J��D�V� |���^8������e��晾 י������mv�ż����i�Q2�Bz��Աtuo�hmW������)DL���x8���G�U(�;
��������B      *   �   x�%�=�0F���ԭhU����!A�A��5T���=�+l^B�R����*4��~�EJ���<ql�2p	�p_Y�r�-q�d�*l��L�$�0'���R���B�[�ѵ{�~
�Mڕ3G�+d"�e";�t�)^�tv�,�'?��$|H�����ܼ�?��N�      %   "   x�3�,-N-2tH�M���K�υ�!$W� �
�      -      x�3�4�2�4bc�=... "      ,   g  x�%�˱c!�(�)��B./�8F}\^�*���/�Oo��-WԶZ5m�������>���S\�)�m��:��t�UsFu���h��c�����0G0}��������1�&+��k��+�ǜ���KP?�������0N�8�Sq,q-�G���1n��Ȝ8>R%��T�㮘.8.s$��-q��e�㲡��V��Ǽ��1G�x$(O��c�=
��l��N�zZ�7N�5"�=�������ڱ�����e��iق�-1����wZ�/���C��)�KF������0�+L�	K�-���{�o��/ƻK�$F����x�	~����'<Rl�O�b����by�     