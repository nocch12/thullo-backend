export const selectWithUser = {
  author: { select: { id: true, name: true } },
  UsersOnBoards: {
    include: {
      user: {
        select: {
          id: true,
          name: true,
          imagePath: true,
        },
      },
    },
  },
} as const;
