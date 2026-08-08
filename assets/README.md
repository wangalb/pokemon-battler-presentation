# assets/

Demo recordings for the deck — **one clip per user story**, six in total:

```
will-demo.mp4     aman-demo.mp4     edison-demo.mp4
cindy-demo.mp4    albert-demo.mp4   dorothy-demo.mp4
```

Drop them here and reload the page. Each `.media-slot` in `index.html` hydrates itself if its file
exists and keeps its dashed placeholder if it does not, so the deck presents cleanly at any stage of
recording. The beats each clip has to hit are in the table in the
[root README](../README.md#adding-the-demo-recordings).

Target **~45 seconds each**. The slots are 16:9, which is what a screen recording produces.

Recording notes, carried over from `docs/presentation-plan.md` in the project repo:

- Backend running, `backend/cache/` warm from a practice run, fresh browser profile, zoom ~125% so HP
  bars read from the back of the room.
- Speed up the dead air: typing at sign-up 4×, grinding out the last few HP 4–8×, picking eight
  tournament entrants 4×.
- Keep at 1× the beats that matter: a super-effective hit, a resisted or missed move, a faint and the
  forced switch, the bracket filling in.
- Cut entirely: any server error, any reload, any dead end.
- Export as plain MP4 onto the presenting laptop — not a share link, not embedded in a deck that may
  not open. Play them once from that laptop before presenting.
