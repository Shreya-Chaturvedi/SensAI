-- CreateTable
CREATE TABLE "MockInterviewSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "averageScore" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockInterviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockInterviewAnswer" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "strengths" TEXT[],
    "weaknesses" TEXT[],
    "improvement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockInterviewAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MockInterviewSession_userId_idx" ON "MockInterviewSession"("userId");

-- CreateIndex
CREATE INDEX "MockInterviewAnswer_sessionId_idx" ON "MockInterviewAnswer"("sessionId");

-- AddForeignKey
ALTER TABLE "MockInterviewSession" ADD CONSTRAINT "MockInterviewSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockInterviewAnswer" ADD CONSTRAINT "MockInterviewAnswer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MockInterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
