Breeze-sync
===========

This is my attempt at adding sync ability for breezejs. 

The sync uses triggers on the db side that creates and maintains ModifiedTimeStamps. This is then used in the client side code to only get the changes from the server.

When data is deleted a trigger adds it to a tombstone table so that clients can remove it from their caches.

At this time all the tables that is used must contain a ModifiedTimeStamp column of type bigint.

Better descriptions coming..
