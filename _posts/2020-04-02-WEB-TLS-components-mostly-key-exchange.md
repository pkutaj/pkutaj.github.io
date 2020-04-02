---
layout: post
title: networking > tls the big pic (focus on public/private key exchange)
categories: [networking]
---

## the case	of tls components and public/private key exchange
* the question is what are the components of TLS encryption and mainly what is the mechanism of public/private key exchange
* the essence of the answer is that in public/private key exchange there are actually 4 keys 
    * public
    * private
    * master / encrypted
    * session / secret

## toc
<!-- TOC -->

- [(1) data encryption](#1-data-encryption)
    - [AES explained](#aes-explained)
- [(2) key exchange](#2-key-exchange)
    - [STEP-1 client connects](#step-1-client-connects)
    - [STEP-2 server sends a certificate](#step-2-server-sends-a-certificate)
    - [STEP-3 client chooses a private key](#step-3-client-chooses-a-private-key)
    - [STEP-4 client creates a master (aka encrypted) key](#step-4-client-creates-a-master-aka-encrypted-key)
    - [STEP-5 client sends the master key over to the HTTPS server](#step-5-client-sends-the-master-key-over-to-the-https-server)
    - [STEP-6 server chooses a private key](#step-6-server-chooses-a-private-key)
    - [STEP-7 server creates a master key](#step-7-server-creates-a-master-key)
    - [STEP-8 server sends the server-master over to the client](#step-8-server-sends-the-server-master-over-to-the-client)
    - [STEP-9 both client and server create session keys](#step-9-both-client-and-server-create-session-keys)
- [(3) handshake integrity](#3-handshake-integrity)

<!-- /TOC -->

## findings
### (1) data encryption
* **DATA ENCRYPTION PROTOCOLS** do the work to get our data encrypted
* they are called **CIPHERS**
    * ~~3DES(168 bits)~~
    * AES
        * GCM
        * CBC
    * Chacha20
        * Poly1305

#### AES explained
* the critical element of AES encryption is the **SECRET KEY** that **BOTH** the client and the server have
* **AES** uses **SYMMETRICAL ENCRYPTION** ➔ both client and server use **IDENTICAL** key in order to encrypt and decrypt the data
* this is the problem: how to make sure that both participants share the secret key if there is an insecure network full of listeners between them?
* ➔ this mechanism is the second component: **KEY EXCHANGE PROTOCOL**

### (2) key exchange
* the mechanism that handles the transfer of a secret key across the insecure network, because it cannot be done directly
* the math is **SIMPLE**, the numbers are **HUGE**
* it is **COMPUTIONALLY INTENSIVE**
* following **KEY EXCHANGE PROTOCOLS** were/are available
    * ~~RSA~~
        * stands for Rivest, Shamir, Adlemen (authors, Berkley, 1960s)
        * implemented in browser technology
        * public-private key exchange protocol
    * Diffie-Hellman (DH)
        * public-private key exchange
        * more often in modern TLS implementation
        * signed with RSA
        * integrity check with the key exchange
    * **Elliptical Curve Diffie-Hellman (ECDH)** (ideally)
        * signed with ECDSA
        * signed with RSA
        * complicated public-private key exchange
        * perfect forward secrecy: keys are created in such a way that even later you can't find that out

#### STEP-1 client connects 
#### STEP-2 server sends a certificate
* inside that **CERTIFICATE**, there are 2 **LARGE PRIME NUMBERS** (course example below)
    * `p = 149`
    * `g = 17`
* this is the **PUBLIC KEY**; everybody can get those numbers

#### STEP-3 client chooses a private key
* client chooses a private key `a=8`
* there is a **WRONG IMPRESSION OUT THERE** according to which
    * ~~we use the public key to encrypt the data~~
    * ~~we use the private key to decrypt the data~~
    * **NOT TRUE**; there are more than 2 keys; with just 2 keys, the is no way to make the transfer secure

#### STEP-4 client creates a master (aka encrypted) key
* what happens is that there is a formula
    * take the number `g`
    * raise it to the power of `a`
    * run a modulus function with `p`

![formula_for_encrypted_key_master_key]({{ site.url }}/assets/img000611.png)

* in the example above the **MASTER KEY** is `5`

![master_key_client_side]({{ site.url }}/assets/img000613.png)

#### STEP-5 client sends the master key over to the HTTPS server
#### STEP-6 server chooses a private key
* `b = 6`

#### STEP-7 server creates a master key
* use the same formula

![formula_for_encrypted_key_master_key]({{ site.url }}/assets/img000611.png)

![master_key_server_side]({{ site.url }}/assets/img000612.png)

#### STEP-8 server sends the server-master over to the client
#### STEP-9 both client and server create session keys
* server takes the received client-master and raises to the power of private key
* with this mechanism, you have a same, symmetrical **SESSION KEY**
* in order to reverse engineer this, you would have to guess what 2 private keys are

![formula_for_creating_session_key]({{ site.url }}/assets/img000614.png)

![session_key_creation]({{ site.url }}/assets/2020-03-26-session-key-creation.gif)

### (3) handshake integrity
* the last piece of the encryption
* client and server can verify that the TLS handshake has not been tampered with
* in order for TLS to operate a **HANDSHAKE** has to happen
* there are **SECURE HASH ALGORITHMS**
    * SHA
    * SHA-256
    * SHA-384