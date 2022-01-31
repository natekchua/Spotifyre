--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg16.04+1)
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: spotifyre; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA spotifyre;


ALTER SCHEMA spotifyre OWNER TO postgres;

--
-- Name: SCHEMA spotifyre; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA spotifyre IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: playlists; Type: TABLE; Schema: spotifyre; Owner: postgres
--
CREATE TABLE spotifyre.playlists (
    playlistid character varying(256) NOT NULL,
    userid character varying(256)
);


ALTER TABLE spotifyre.playlists OWNER TO postgres;

--
-- Name: suggestions; Type: TABLE; Schema: spotifyre; Owner: postgres
--
CREATE TABLE spotifyre.suggestions (
    songid character varying(256) NOT NULL,
    playlistid character varying(256) NOT NULL,
    suggested_by_userid character varying(256),
    playlist character varying(256),
    count integer,
    song_title character varying(256),
    artist character varying(256),
    album_art character varying(256),
    suggested_by_username character varying(256)
);


ALTER TABLE spotifyre.suggestions OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: spotifyre; Owner: postgres
--
CREATE TABLE spotifyre."user" (
    userid character varying(256) NOT NULL,
    name character varying(256),
    access_token character varying(512),
    refresh_token character varying(512),
    profile_pic character varying(1024),
    followers integer
);


ALTER TABLE spotifyre."user" OWNER TO postgres;

ALTER TABLE ONLY spotifyre.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (playlistid);

--
-- Name: suggestions suggestions_pkey; Type: CONSTRAINT; Schema: spotifyre; Owner: postgres
--
ALTER TABLE ONLY spotifyre.suggestions
    ADD CONSTRAINT suggestions_pkey PRIMARY KEY (songid, playlistid);


--
-- Name: user users_pkey; Type: CONSTRAINT; Schema: spotifyre; Owner: postgres
--
ALTER TABLE ONLY spotifyre."user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: playlists playlists_userid_fkey; Type: FK CONSTRAINT; Schema: spotifyre; Owner: postgres
--

ALTER TABLE ONLY spotifyre.playlists
    ADD CONSTRAINT playlists_userid_fkey FOREIGN KEY (userid) REFERENCES spotifyre."user"(userid);


--
-- Name: suggestions suggestions_playlistid_fkey; Type: FK CONSTRAINT; Schema: spotifyre; Owner: postgres
--

ALTER TABLE ONLY spotifyre.suggestions
    ADD CONSTRAINT suggestions_playlistid_fkey FOREIGN KEY (playlistid) REFERENCES spotifyre.playlists(playlistid);


--
-- Name: SCHEMA spotifyre; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA spotifyre FROM postgres;
REVOKE ALL ON SCHEMA spotifyre FROM PUBLIC;
GRANT ALL ON SCHEMA spotifyre TO postgres;
GRANT ALL ON SCHEMA spotifyre TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO postgres;
