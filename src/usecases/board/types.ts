export const selectWithUser = {
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
