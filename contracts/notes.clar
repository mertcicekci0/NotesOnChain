;; title: notes
;; version: 1.0.0
;; summary: Simple note storage smart contract
;; description: A contract that allows users to store and retrieve personal notes

;; constants
(define-constant ERR-NOTE-TOO-LONG (err u100))
(define-constant ERR-NOT-FOUND (err u404))

;; data vars
(define-data-var next-id uint u1)

;; data maps
(define-map notes
  {user: principal, id: uint}
  {content: (string-ascii 200), created: uint}
)

;; public functions

;; Add a new note
(define-public (add-note (content (string-ascii 200)))
  (let (
    (note-id (var-get next-id))
    (caller tx-sender)
  )
    (if (> (len content) u200)
      ERR-NOTE-TOO-LONG
      (begin
        (map-set notes 
          {user: caller, id: note-id}
          {content: content, created: stacks-block-height}
        )
        (var-set next-id (+ note-id u1))
        (ok note-id)
      )
    )
  )
)

;; Get a specific note by ID
(define-read-only (get-note (user principal) (id uint))
  (match (map-get? notes {user: user, id: id})
    note-data (ok note-data)
    ERR-NOT-FOUND
  )
)

;; Get all notes for a user (helper function to check if note exists)
(define-read-only (get-user-note-count (user principal))
  (var-get next-id)
)
;;

;; read only functions
;;

;; private functions
;;

